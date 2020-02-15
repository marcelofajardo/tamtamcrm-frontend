<?php

namespace App\Designs;

abstract class AbstractDesign
{
    abstract public function header();

    abstract public function body();

    abstract public function table();

    abstract public function footer();

    abstract public function table_styles();
}
