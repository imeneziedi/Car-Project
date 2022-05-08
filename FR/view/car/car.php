<h1 class="page-header" style="text-align:center;color:green;">Vehicle management</h1>


    <a class="btn btn-success pull-right" href="?c=car&a=Crud">AJOUTER VEHICULE</a>
    <a class="btn btn-warning pull-left" href="../">EN</a>
<br><br><br>

<table class="table  table-striped  table-hover" id="tabla">
    <thead>
        <tr>
        <th style="width:120px; background-color: #5DACCD; color:#fff">ID</th>
            <th style="width:180px; background-color: #5DACCD; color:#fff">Designation</th>
            <th style=" background-color: #5DACCD; color:#fff">Brand</th>
            <th style=" background-color: #5DACCD; color:#fff">Model</th>
            <th style="width:120px; background-color: #5DACCD; color:#fff">Overview</th>            
            <th style="width:120px; background-color: #5DACCD; color:#fff">Price</th>            
            <th style="width:120px; background-color: #5DACCD; color:#fff">Fuel Type</th>            
            <th style="width:120px; background-color: #5DACCD; color:#fff">Seating Capacity</th>            
            <th style="width:60px; background-color: #5DACCD; color:#fff"></th>
            <th style="width:60px; background-color: #5DACCD; color:#fff"></th>
        </tr>
    </thead>
    <tbody>
	<?php $i=0;?>
    <?php foreach($this->model->ToList() as $r): ?>
        <tr>
		<?php $i++;?>
         <td><?php echo $i; ?></td>
         <td><?php echo $r->car_designation; ?></td>
            <td><?php echo $r->car_model; ?></td>
            <td><?php echo $r->car_brand; ?></td>
            <td><?php echo $r->car_overview; ?></td>
            <td><?php echo $r->car_price; ?></td>
            <td><?php echo $r->car_fuelType; ?></td>
            <td><?php echo $r->car_seatingCapacity; ?></td>
            <td>
                <a  class="btn btn-warning" href="?c=car&a=Crud&car_id=<?php echo $r->car_id; ?>">Edit</a>
            </td>
            <td>
                <a  class="btn btn-danger" onclick="javascript:return confirm('Are you sure to delete this car?');" href="?c=car&a=Remove&car_id=<?php echo $r->car_id; ?>">Remove</a>
            </td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table> 

</body>
<script  src="assets/js/datatable.js">  

</script>


</html>
