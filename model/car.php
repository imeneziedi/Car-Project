<?php
class car
{
	private $pdo;
    
    public $car_id;
    public $car_designation;
    public $car_model;
    public $car_brand;  
    public $car_overview;
    public $car_price;
    public $car_fuelType;
    public $car_seatingCapacity;

	public function __CONSTRUCT()
	{
		try
		{
			$this->pdo = Database::StartUp();     
		}
		catch(Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function ToList()
	{
		try
		{
			$result = array();

			$stm = $this->pdo->prepare("SELECT * FROM car");
			$stm->execute();

			return $stm->fetchAll(PDO::FETCH_OBJ);
		}
		catch(Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function Obtain($car_id)
	{
		try 
		{
			$stm = $this->pdo
			          ->prepare("SELECT * FROM car WHERE car_id = ?");
			          

			$stm->execute(array($car_id));
			return $stm->fetch(PDO::FETCH_OBJ);
		} catch (Exception $e) 
		{
			die($e->getMessage());
		}
	}

	public function Remove($car_id)
	{
		try 
		{
			$stm = $this->pdo
			            ->prepare("DELETE FROM car WHERE car_id = ?");			          

			$stm->execute(array($car_id));
		} catch (Exception $e) 
		{
			die($e->getMessage());
		}
	}

	public function Update($data)
	{
		try 
		{
			$sql = "UPDATE car SET 
						car_designation      		= ?,
						car_model          = ?, 
						car_brand        = ?,
                        car_overview        = ?,
                        car_fuelType        = ?,
                        car_seatingCapacity        = ?,
						car_price        = ?
				    WHERE car_id = ?";

			$this->pdo->prepare($sql)
			     ->execute(
				    array(
						$data->car_designation, 
						$data->car_model,
						$data->car_brand, 
						$data->car_overview, 
						 $data->car_fuelType,
						 $data->car_seatingCapacity,
						 $data->car_price,
						 $data->car_id
					)
				);
		} catch (Exception $e) 
		{
			die($e->getMessage());
			print($sql);
		}
	}

	public function Register(car $data)
	{

		try 
		{
		$sql = "INSERT INTO car (car_designation,car_model,car_brand,car_overview,car_fuelType,car_seatingCapacity,car_price) 
		        VALUES (?, ?, ?, ?, ?, ?, ?)";

		$this->pdo->prepare($sql)
		     ->execute(
				array(
					 $data->car_designation, 
                    $data->car_model,
                    $data->car_brand, 
                    $data->car_overview, 
                     $data->car_fuelType,
                     $data->car_seatingCapacity,
					 $data->car_price
                   
                )
			);
		} catch (Exception $e) 
		{
			die($e->getMessage());
		}
	}
}