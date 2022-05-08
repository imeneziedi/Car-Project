<?php
require_once 'model/car.php';

class carController{
    
    private $model;
    
    public function __CONSTRUCT(){
        $this->model = new car();
    }
    
    public function Index(){
        require_once 'view/header.php';
        require_once 'view/car/car.php';
       
    }
    
    public function Crud(){
        $car = new car();
        
        if(isset($_REQUEST['car_id'])){
            $car = $this->model->Obtain($_REQUEST['car_id']);
        }
        
        require_once 'view/header.php';
        require_once 'view/car/car-edit.php';
        
    }
    
    public function Save(){
        $car = new car();
        
        $car->car_id = $_REQUEST['car_id'];
        $car->car_designation = $_REQUEST['car_designation'];
        $car->car_model = $_REQUEST['car_model'];
        $car->car_brand = $_REQUEST['car_brand'];
        $car->car_overview = $_REQUEST['car_overview'];     
        $car->car_fuelType = $_REQUEST['car_fuelType'];    
        $car->car_seatingCapacity = $_REQUEST['car_seatingCapacity'];    
        $car->car_price = $_REQUEST['car_price']; 

        $car->car_id > 0 
            ? $this->model->Update($car)
            : $this->model->Register($car);
        
        header('Location: index.php');
    }
    
    public function Remove(){
        $this->model->Remove($_REQUEST['car_id']);
        header('Location: index.php');
    }
}