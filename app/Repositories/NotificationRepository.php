<?php
namespace App\Repositories;

use App\Notification;
use App\Repositories\Interfaces\NotificationRepositoryInterface;
use App\Repositories\Base\BaseRepository;
use Illuminate\Support\Collection;

class NotificationRepository extends BaseRepository implements NotificationRepositoryInterface
{
    /**
     * NotificationRepository constructor.
     *
     * @param Notification $notification
     */
    public function __construct(Notification $notification)
    {
        parent::__construct($notification);
        $this->model = $notification;
    }

    /**
     * @param array $columns
     * @param string $orderBy
     * @param string $sortBy
     *
     * @return Collection
     */
    public function listNotifications(
        $columns = array('*'),
        string $orderBy = 'id',
        string $sortBy = 'asc'
    ) : Collection
    {
        return $this->all($columns, $orderBy, $sortBy);
    }

    /**
     * @param array $data
     * @return Notification
     */
    public function create(array $data) : Notification {
        $test = $this->create($data);

    }

    /**
     * @param Notification $notification
     * @param array $data
     * @return bool
     */
    public function save(Notification $notification, array $data)
    {
        $notification->fill($data);
        return $notification->save();
    }
}