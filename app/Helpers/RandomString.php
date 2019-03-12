<?php
namespace Vanderbilt\EpicParticipantUpdater\App\Helpers;

class RandomString
{
    private static $min_length = 10;

    /**
     * return a random alphanumeric string
     *
     * @param integer $length
     * @return string
     */
    public static function generate($length=64)
    {
        if($length<self::$min_length) throw new Exception(sprintf("Error: the random string must be at least %s characters", self::$min_length), 1);
        
        $characters_array = array_merge(range('A', 'Z'), range('a', 'z'),range(0, 9));
        $characters = implode('', $characters_array);
        $characters_length = strlen($characters);
        $random_string = '';

        for ($i = 0; $i < $length; $i++)
        {
            $random_string .= $characters[mt_rand(0, $characters_length)];
        }
        return $random_string;
    }

}