<?php

namespace Codedelivery\Util;

class Flash{
    public function success($message){
        session()->flash('flash_message',$message);
        session()->flash('flash_message_type',BOOTSTRAP_SUCCESS);
    }

    public function error($message){
        session()->flash('flash_message',$message);
        session()->flash('flash_message_type',BOOTSTRAP_DANGER);
    }

    public function alert($message)
    {
        session()->flash('flash_message', $message);
        session()->flash('flash_message_type', BOOTSTRAP_WARNING);
    }

    public function info($message){
        session()->flash('flash_message',$message);
        session()->flash('flash_message_type',BOOTSTRAP_INFO);
    }
}