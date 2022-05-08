$(document).ready(function() {
    $('#tabla').DataTable( {
        "language": {
            "lengthMenu":"Show _MENU_ records per page.",
            "search" : "Search",
             "zeroRecords": "We are sorry. No records found.",
            "info": "Showing page _PAGE_ of _PAGES_",
            "infoEmpty": "There are no records yet.",
            "infoFiltered": "(filtered from a total of _MAX_ records)",
            "LoadingRecords": "Charging ...",
            "Processing": "Processing...",
             "SearchPlaceholder": "Start typing...",
             "paginate": {
     "previous": "Previous",
     "next": "Following", 
      }
        },
     
  
   "sort": false
  
    } );
} );