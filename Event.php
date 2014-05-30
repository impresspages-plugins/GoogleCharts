<?php
/**
 * Load JavaScript file.
 */
namespace Plugin\GoogleCharts;

class Event
{
    public static function ipBeforeController()
    {
        ipAddJs('https://www.google.com/jsapi');
        ipAddJs('assets/googlecharts.js');
        ipAddJs('assets/lib/handsontable/dist/jquery.handsontable.full.js');
        ipAddCss('assets/lib/handsontable/dist/jquery.handsontable.full.css');
        ipAddCss('assets/googlecharts.css');
    }

}
