<?php

namespace App\Designs;

class Custom extends AbstractDesign
{

    private $header;

    private $body;

    private $table;

    private $footer;

    private $table_styles;

    /**
     * Custom constructor.
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->header = $data['header'];
        $this->body = $data['body'];
        $this->table = $data['table'];
        $this->footer = $data['footer'];
        $this->table_styles = $data['table_styles'];
    }

    public function header()
    {

        return $this->header;

    }

    public function body()
    {

        return $this->body;

    }

    public function table_styles()
    {

        return $this->table_styles;

    }

    public function table()
    {

        return $this->table;

    }

    public function footer()
    {

        return $this->footer;

    }

}
