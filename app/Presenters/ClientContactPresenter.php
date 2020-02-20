<?php

namespace App\Presenters;

/**
 * Class ClientContactPresenter
 * @package App\Models\Presenters
 */
class ClientContactPresenter extends EntityPresenter
{

    /**
     * @return string
     */
    public function name()
    {
        return $this->entity->first_name . ' ' . $this->entity->last_name;
    }
}
