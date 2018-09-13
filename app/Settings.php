<?php
namespace Vanderbilt\EpicParticipantUpdater\App;

class Settings
{
    static function renderOptions($pid, $name, $selected='')
    {
        $Proj = new \Project($this_project_id=$pid, $autoLoadAttributes=true);
        $fields = array_keys($Proj->metadata);
        $options = array_map(function($field)  use($selected){
            $html = '<option';
            $html .= $field==$selected ? ' selected>' : '>';
            return join(array($html, $field, '</option>'), '');
        }, $fields);
        
        $empty_option = '<option value="">select...</option>';
        array_unshift($options, $empty_option);
        $options = join($options,'');
        echo join(array("<select name=\"{$name}\">",$options,"</select>"),'');
    }
}