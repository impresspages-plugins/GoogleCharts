<?php

// Put this into Controller.php

namespace Plugin\GoogleCharts\Widget\PieChart;

class Controller extends \Ip\WidgetController
{
    public function generateHtml($revisionId, $widgetId, $data, $skin)
    {
        if (empty($data['chartData'])){
            $data['chartData'] = array('','');
        }

        if (empty($data['title'])){
            $data['title'] = '';
        }

        return parent::generateHtml($revisionId, $widgetId, $data, $skin);
    }

    public function adminHtmlSnippet(){

        $form = new \Ip\Form();
        // Add a text field to form object
        $field = new \Ip\Form\Field\Text(
            array(
                'name' => 'title', // HTML "name" attribute
                'label' => __('Chart title', 'GoogleCharts'), // Field label that will be displayed next to input field
            ));
        $form->addField($field);

        $data['form'] = $form;

        return ipView('snippet/edit.php', $data)->render();
    }

}
