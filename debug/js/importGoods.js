$(function () {
    $(".close").bind("click", function() {
        $(this).parents(".alert").hide();
    });
    $(".btn-chooseSort").bind("click", function() {
    	$(".popSort").loadTemp("popUserType", "nochangeurl", function () {
            
        });
    });
    $(".btn-cancel").bind("click",function() {
    	$(".pop").hide();
    });

       // $(".btn-import-data").bind("click", function () {
           $('#myForm').ajaxForm(function (data) {
               unloading();
               if (data.ok) {
                   alert("上传成功");
                   $('.pop').hide();
               } else {
                   alert(data.resDescription || data.data);
                   $('.pop').hide();
               }
           });
           $('.btn-cancel').bind('click', function () {
               $(".pop").hide();
           });


           $(".ex-ok").bind("click", function () {
               if (($("#file").val())) {
                   document.myForm.action = plumeApi["uploadEx"] + session.goods_baseCategoryId + "/" + session.goods_subCategoryId + "/" + session.goods_categoryId
                   $('#myForm').submit();
                   session.goods_baseCategoryId = "";
                   session.goods_subCategoryId = "";
                   session.goods_categoryId = "";
               }
           });

           $(".btn-loadModule").bind("click", function () {
               if (session.goods_baseCategoryId) {
                   var count = $(".btn-count input").val();
                   window.location = plumeApi["downloadEx"] + session.goods_baseCategoryId + "/" + session.goods_subCategoryId + "/" + session.goods_categoryId + "?count=1000"
               } else {
                   alert(请选择类目);
               }
           });
   // })

})