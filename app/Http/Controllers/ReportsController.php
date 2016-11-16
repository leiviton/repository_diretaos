<?php
/**
 * Created by PhpStorm.
 * User: leiviton
 * Date: 16/11/2016
 * Time: 08:57
 */

namespace CodeDelivery\Http\Controllers;

use JasperPHP\JasperPHP;


class ReportsController extends Controller
{

    public function jsonToPdf()
    {
        $output = 'public/report/'.time().'_Contacts';
        $ext = "pdf";
        $driver = 'json';
        $json_query= "contacts.person";
        $data_file = public_path() . '/report/contacts.json';

        $php_jasper = new JasperPHP;

        $php_jasper->process(
            public_path() . '/report/json.jrxml',
            $output,
            array($ext),
            array(),
            array('data_file' => $data_file, 'driver' => $driver, 'json_query' => $json_query))->execute();

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename='.time().'_Contacts.'.$ext);
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Content-Length: ' . filesize($output.'.'.$ext));
        flush();
        readfile($output.'.'.$ext);
        unlink($output.'.'.$ext);
    }
}