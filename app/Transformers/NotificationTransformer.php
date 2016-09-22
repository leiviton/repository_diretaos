<?php

namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Notification;

/**
 * Class NotificationTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class NotificationTransformer extends TransformerAbstract
{

    /**
     * Transform the \Notification entity
     * @param \Notification $model
     *
     * @return array
     */
    public function transform(Notification $model)
    {
        return [
            'id'         => (int) $model->id,
            'user_id' => (int) $model->user_id,
            'title' => $model->title,
            'message' => $model->message,
            'read' => $model->read,
            'confirmation' => $model->confirmation,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at,
            'bit_read' => $model->bit_read
        ];
    }
}
