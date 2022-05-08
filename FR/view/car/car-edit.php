<h1 class="page-header">
    <?php echo $car->car_id != null ? $car->car_model : 'New Vehicle'; ?>
</h1>

<ol class="breadcrumb">
  <li><a href="?c=car">car</a></li>
  <li class="active"><?php echo $car->car_id != null ? $car->car_model : 'New Vehicle'; ?></li>
</ol>

<form id="frm-alumno" action="?c=car&a=Save" method="post" enctype="multipart/form-data">
    <input type="hidden" name="car_id" value="<?php echo $car->car_id; ?>" />
      <div class="form-group">
        <label>Designation</label>
        <input type="text" name="car_designation" value="<?php echo $car->car_designation; ?>" class="form-control" placeholder="enter car designation" required>
    </div>
    
    <div class="form-group">
        <label>Model</label>
        <input type="text" name="car_model" value="<?php echo $car->car_model; ?>" class="form-control" placeholder="enter car model" required>
    </div>
    
    <div class="form-group">
        <label>Marque</label>
        <input type="text" name="car_brand" value="<?php echo $car->car_brand; ?>" class="form-control" placeholder="Entrer la marque de la voiture" required>
    </div>
    
    <div class="form-group">
        <label>Overview</label>
        <input type="text" name="car_overview" value="<?php echo $car->car_overview; ?>" class="form-control" placeholder="enter car overview" required>
    </div>
     <div class="form-group">
        <label>Price</label>
        <input type="text" name="car_price" value="<?php echo $car->car_price; ?>" class="form-control" placeholder="enter car price" required>
    </div>
     <div class="form-group">
        <label>Fuel Type</label>
        <input type="text" name="car_fuelType" value="<?php echo $car->car_fuelType; ?>" class="form-control" placeholder="enter car fuel Type" required>
    </div>
     <div class="form-group">
        <label>Seating Capacity</label>
        <input type="number" name="car_seatingCapacity" value="<?php echo $car->car_seatingCapacity; ?>" class="form-control" placeholder="enter car seating Capacity" required>
    </div>	
    
    <hr />
    
    <div class="text-right">
        <button class="btn btn-primary">Save</button>
    </div>
</form>

<script>
    $(document).ready(function(){
        $("#frm-alumno").submit(function(){
            return $(this).validate();
        });
    })
</script>