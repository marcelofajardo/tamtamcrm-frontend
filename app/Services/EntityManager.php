<?php

namespace App\Services;

class EntityManager
{

    static public function getRepository($model)
    {
        $r = new \ReflectionObject($model);
        $p = $r->getProperty('repository');
        $p->setAccessible(true); // <--- you set the property to public before you read the value
        $repositoryName = $p->getValue($model);
        $repo = new $repositoryName($model);

        return $repo;
    }

}

/*
$obj = new test2();
$repo = EntityManager::getRepository($obj);
$testValue = $repo->test();
var_dump($testValue);
*/
