<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

class MY_Email extends CI_Email {

     var $CI;
     var $_mail;
     
     function __construct()
     {
        parent::__construct();
        $CI =& get_instance(); 
     }
     
     function config($data){
        $this->_mail=array(
                            "from_sender"       => "taikhoankiemtien92@gmail.com",
                            "name_sender"       => "LoveGive",
                            "subject_sender"    => "Active acount Manager Member with CodeIgniter 2.1.4",
                         );

        
        $this->_mail['to_receiver'] = $data['to_receiver'];               
        $this->_mail['message'] = $data['message'];
     }
     
     function sendmail(){
        
            $config['protocol']    = 'smtp';
            $config['smtp_host']    = 'ssl://smtp.gmail.com';
            $config['smtp_port']    = '465';
            $config['smtp_timeout'] = '7';
            $config['smtp_user']    = 'taikhoankiemtien92@gmail.com'; // ten email
            $config['smtp_pass']    = '123456789hiep'; // pass gmail
            $config['charset']    = 'utf-8';
            $config['newline']    = "\r\n";
            $config['mailtype'] = 'html'; // or html
            $config['validation'] = TRUE; // bool whether to validate email or not      
            $this->initialize($config);
        
        
            $this->from($this->_mail['from_sender'], $this->_mail['name_sender']);
            $this->to($this->_mail['to_receiver']); 
        
            $this->subject($this->_mail['subject_sender']);
            $this->message($this->_mail['message']);
        
            $this->send();
     }
}
