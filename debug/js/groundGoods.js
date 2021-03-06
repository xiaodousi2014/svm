$(function(){
	datas={
		  "productName": "",
		  "modelNumber": "",
		  "saleStatus": ""
		 }
	tablecheckbox();
	plumeLog("进入groundGoods模板自定义js-"+plumeTime());
	$('.table-block').on('click','.btn-delect',function(){
		getGoodsPsgId(this);
		delectGoodsData();
	});
	$('.table-block').on('click','.btn-compile',function() {
		getGoodsPsgId(this);
		derict(this, "compileGoods", "nochangeurl");
	});
	$('.table-block').on('click','.btn-ground',function() {
		getGoodsPsgId(this);
		if($(this).html()=="上架"){
			 	groundGoods() 
			}else{
				soldOutGoods()
			}
	});
	var nowPage =1;
	getGoodsData();
	$('.btn-search').bind('click',function() {
		datas.productName=$('#productName').val();
		datas.modelNumber=$('#modelNumber').val();
		datas.saleStatus=$('#saleStatus').val();
		getGoodsData();
        $(".nav-pagination").off();
	})

	//上下架商品列表

function getGoodsData() {
    loading();
    var newData = JSON.stringify(datas)
    $.ajax({
        url: plumeApi["listProductShopGoods"]+"?currentPage=1&onePageCount="+onePageCount(),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: newData,
        success: function (data) {
            unloading();
            $("[list-node]").remove();
            $(".table-block").setPageData(data);
            filter();

            totalPage=Math.ceil(data.countRecord/onePageCount());
			newPage(totalPage,function(i){
			var newData = JSON.stringify(datas);
            loading();
			$.ajax({
				url: plumeApi["listProductShopGoods"]+"?currentPage="+i+"&onePageCount="+onePageCount(),
				type: "POST",
				data: newData,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					 unloading();
                    $("[list-node]").remove();
                    $(".table-block").setPageData(data);
            	filter();
				},
				});
			});


        }
    });
}

//商品上架
function groundGoods() {
    loading();
    $.ajax({
        url: plumeApi["enableProductShopGoods"] + session.goods_psgId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.ok) {
                unloading();
                popTips("上架成功", "success");
                getGoodsData();
            } else {
                unloading();
                popTips("上架失败", "warning");
                getGoodsData();
            }
        }
    });
}

//商品下架
function soldOutGoods() {
    loading();
    $.ajax({
        url: plumeApi["disableProductShopGoods"] + session.goods_psgId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.ok) {
                unloading();
                popTips("下架成功", "success");
                getGoodsData();
            } else {
                unloading();
                popTips("下架失败", "warning");
                getGoodsData();
            }
        }
    });
}


//信息过滤
	function filter() {
		 $('.createDate').each(function () {
                $(this).html(_getLocalTime($(this).html()));
                var aTr = $(this).parents('tr');
                var saleStatus = aTr.find('.saleStatus');
                var btnGround = aTr.find('.btn-ground');
                if (saleStatus.html() == 0) {
                    saleStatus.html('下架中');
                    btnGround.html('上架');
                } else {
                    saleStatus.html('上架中');
                    btnGround.html('下架');
                }
            });
         
	}

//删除商品数据
function delectGoodsData() {

    $('.pop').loadTemp("popConfirm", "nochangeurl", function () {
        // 改变弹出框中文字和图标显示
        $(".pop").find(".popup-title").html("删除确认？");
        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
        $(".pop").find(".popup-info").html("是否确认删除记录？");
        $(".pop").find(".btn-sure").addClass("btn-danger").removeClass("btn-success");
        // 绑定按钮事件
        $('.pop').on('click', '.btn-sure', function () {
            loading();
            $.ajax({
                url: plumeApi["delProductShopGoods"] +"/"+ session.goods_psgId,
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    if (data.ok) {
                        unloading();
                        popTips("删除成功", "success");
                        getGoodsData();
                    } else {
                        unloading();
                        popTips("删除失败", "warning");
                        getGoodsData();
                    }
                }
            });
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
        $('.pop').on('click', '.btn-cancel', function () {
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
    });
}



//清空搜索
    $('.btn-empty').bind('click', function() {
        window.location.reload();
    });

//回车搜索
    keyDown('.btn-search');


});

