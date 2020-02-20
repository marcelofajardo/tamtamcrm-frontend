<?php

function ctrans(string $string, $replace = [], $locale = null): string
{
    //todo pass through the cached version of the custom strings here else return trans();

    return trans($string, $replace, $locale);
}
