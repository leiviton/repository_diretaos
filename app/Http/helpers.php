<?php

    const BOOTSTRAP_SUCCESS = 0;
    const BOOTSTRAP_INFO = 1;
    const BOOTSTRAP_WARNING = 2;
    const BOOTSTRAP_DANGER = 3;

    function bootstrap_message($type = null){
        $classes = [
            BOOTSTRAP_SUCCESS=>'success',
            BOOTSTRAP_INFO=>'info',
            BOOTSTRAP_DANGER=>'danger',
            BOOTSTRAP_WARNING=>'warning'
        ];
        return isset($classes[$type]) ? $classes[$type] : $classes[array_rand($classes,1)];
    }

    function flash(){
        return app(\Codedelivery\Util\Flash::class);
    }