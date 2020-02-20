<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\CommentRepositoryInterface;
use App\Repositories\Interfaces\NotificationRepositoryInterface;
use App\Repositories\Interfaces\EventRepositoryInterface;
use App\Notification;
use App\Transformations\NotificationTransformable;
use App\Transformations\EventTransformable;

;

use Illuminate\Support\Facades\Auth;
use App\Event;

class ActivityController extends Controller
{

    use NotificationTransformable, EventTransformable;

    /**
     * @var CommentRepositoryInterface
     */
    private $commentRepository;

    /**
     * @var NotificationRepositoryInterface
     */
    private $notificationRepository;

    /**
     * @var EventRepositoryInterface
     */
    private $eventRepository;

    /**
     * ActivityController constructor.
     *
     * @param CommentRepositoryInterface $commentRepository
     * NotificationRepositoryInterface $notificationRepository
     */
    public function __construct(CommentRepositoryInterface $commentRepository,
        NotificationRepositoryInterface $notificationRepository,
        EventRepositoryInterface $eventRepository)
    {
        $this->commentRepository = $commentRepository;
        $this->notificationRepository = $notificationRepository;
        $this->eventRepository = $eventRepository;
    }

    public function index()
    {
        $currentUser = Auth::user();
        $comments = $this->commentRepository->getCommentsForActivityFeed();
        $list = $this->notificationRepository->listNotifications();
        $userEvents = $this->eventRepository->getEventsForUser($currentUser);

        $events = $userEvents->map(function (Event $event) {
            return $this->transformEvent($event);
        })->all();

        $notifications = $list->map(function (Notification $notification) {
            return $this->transformNotification($notification);
        })->all();

        return response()->json([
            'notifications' => $notifications,
            'comments' => $comments,
            'events' => $events
        ]);
    }

}
