<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Permission
 *
 * @author michael.hampton
 */
class Permission {

    public function test() {

        $role = Role::find(1810);
        $arrPermissions = [];

        foreach (Route::getRoutes()->getRoutes() as $key => $route) {
            $action = $route->getActionname();
            $_action = explode('@', $action);

            $controller = $_action[0];
            $method = end($_action);

            $controller = str_replace($route->getAction()['namespace'], '', $controller);
            $controller = str_replace("controller", '', $controller);

            $permissionName = strtolower(substr($controller, 1) . '.' . $method);

            $exists = Permission::where('name', '=', $permissionName)->first();

            if (!$exists) {
                $flight = Permission::create(['name' => $permissionName]);
                $arrPermissions[] = $flight->id;
            }
        }

        $role->permissions()->attach($arrPermissions);
    }

}
