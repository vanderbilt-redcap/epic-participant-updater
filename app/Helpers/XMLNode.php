<?php namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

class XMLNode
{
	public $xml_string;
	public $xml;
	public $namespaced_tag;
	public $tag;
	public $namespace;
	public $attributes = array();
	public $children;
	public $value;

	private $metadata_keys = array(
		'xml',
		'namespaced_tag',
		'tag',
		'namespace',
		'children',
		'value',
	);
	private $metadata = array();

	function __construct($xml_string, $tag_name='\w+')
	{
		$metadata = $this->getNodeMetadata($xml_string, $tag_name);
		if(is_object($metadata))
		{
			foreach ($metadata as $key => $value) {
				$this->{$key} = $value;
			}
		}
	}

	/**
	 * facory to create a new instance of this class
	 *
	 * @param string $xml_string
	 * @param string $tag_name
	 * @return void
	 */
	public static function factory($xml_string, $tag_name='\w+')
	{
		return new self($xml_string, $tag_name);
	}

	 /**
     * extract 
     *
     * @param string $xml_string
     * @param string $tag_name if omitted gets the first available tag (useful in recursion)
     * @param boolean $ignore_namespace
     * @return void
     */
    private function getNodeMetadata($xml_string, $tag_name='\w+')
    {
        $regex = self::getRegularExpression($tag_name);
        preg_match($regex, $xml_string, $matches);

		$metadata = array();
        if(empty($matches)) return $xml_string;
        
		$node_metadata = array();
		$match = $matches[0]; // the current matched element
		$node_metadata['xml_string'] = $match;
		$node_metadata['xml'] = @simplexml_load_string($match);
		$node_metadata['namespaced_tag'] = $matches['ns_tag'];
		$node_metadata['tag'] = $matches['tag'];
		$node_metadata['namespace'] = $matches['ns'];
		$node_metadata['attributes'] = self::getAttributes($matches['attr']);
		$children = self::getNodes($matches['children']);
		if(!is_array($children))
		{
			$node_metadata['value'] = $children;
			$children = array();
		}
		$node_metadata['children'] = $children;

		return (object)$node_metadata;
	}

	/**
	 * find a node children with the specified tag
	 *
	 * @param string $tag_nme
	 * @return XMLNode|XMLNode[]
	 */
	public function find($tag_name)
	{
		$nodes = self::getNodes($this->xml_string, $tag_name);
		if(empty($nodes)) return false;
		if(count($nodes)===1) return $nodes[0];
		return $nodes;
	}
	
	/**
	 * get nodes using a regular expression
	 *
	 * @param string $xml_string
	 * @param string $tag_name
	 * @return XMLNode[]|string matched nodes or the value of the node as a string
	 */
	private static function getNodes($xml_string, $tag_name='\w+')
	{
		$regex = self::getRegularExpression($tag_name);
		preg_match_all($regex, $xml_string, $matches);

		if(empty($matches[0])) return $xml_string;
		$nodes = array();
		foreach ($matches[0] as $match) {
			$nodes[] = self::factory($match);
		}
		return $nodes;
	}

	/**
	 * return a regular expression that can capture XML tags (normal and self closing ones)
	 * 
	 * this regular expression also creates these capturing groups:
	 * ns: namespace (if present)
	 * tag: the tag itself
	 * attr: the attributes of the tag 
	 * children: all what is between the opening and closing tags
	 *
	 * @param string $tag_name
	 * @return void
	 */
	private static function getRegularExpression($tag_name)
	{
		return "/<(?P<ns_tag>(?:(?P<ns>\w+)(?::))?(?P<tag>{$tag_name}))(?P<attr>[^>]*)?(>(?P<children>.*?)<\/(?P=ns_tag)>|\/>)/is";
	}

    /**
     * extract attributes from a string of attributes
     *
     * @param string $attributes_as_string
     * @return void
     */
    private static function getAttributes($attributes_as_string)
    {
        $regex = "/(?P<name>\S+)=['\"](?P<value>.*?)['\"]/is";
        preg_match_all($regex, $attributes_as_string, $matches);
        $attributes = array();
        if(isset($matches['name']))
        {
            foreach ($matches['name'] as $index => $name) {
                $attributes[$name] = $matches['value'][$index];
            }
        }
        return $attributes;
	}
	
	/**
	 * print the node
	 *
	 * @return string
	 */
	public function __toString()
	{
		return $this->xml_string;
	}

	/**
     * setter magic function
     *
     * @param string $name
     * @param mixed $value
     */
	public function __set($name, $value)
    {
        if(array_key_exists($name, $this->metadata_keys))
        {
            // use different key as specified in $this->reserved_keys
            $this->metadata[$name] = $value;
        }
    }

    /**
     * get a children with the specified tag
     *
     * @param string $name
     * @return void
     */
	public function __get($name)
    {

		$children = array();
		foreach($this->children as $child)
		{
			if($child->tag === $name) $children[] = $child;
		}
		if(!empty($children)) {
			if(count($children)===1) return $children[0];
			return $children;
		}

        $trace = debug_backtrace();
        trigger_error(
            'Undefined property via __get(): ' . $name .
            ' in ' . $trace[0]['file'] .
            ' on line ' . $trace[0]['line'],
            E_USER_NOTICE);
        return null;
	}
}