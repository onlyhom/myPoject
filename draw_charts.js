$(window).load(function(){

	// 图表命名目录： 
	// 中国公共WIFI布局一览图 china_wifi_layout 
	// 前15的城市公共WiFi数量以及其在该省占比 city_wifi_rank 
	// 前10的省份的前10的公共场景WiFi占比情况 province_scene_occupy 
	// 前15的场景公共WiFi数量在整体公共WiFi数量占比 scene_wifi_occupy 
	// 前15的运营商公共WiFi数量以及其在整体公共WiFi数量的占比 operator_wifi_occupy 
	// 前10的运营商在前10的场景公共WiFi布局占比情况 operator_scene_occupy 
	// 收集到反馈前15的城市 占反馈总数的比例 city_feedback_occupy 


	var mainColor = '#5b9bd5'; 
	var current_day = new Date(); //获取今天的日期
	$('.date').text(current_day.getFullYear()+'年'+(current_day.getMonth()+1)+'月'+current_day.getDay()+'日');


	function randomValue() {
	    return Math.round(Math.random()*1000);
	}

	//随机生成15个城市数据
	function createRandom(type, srting_name){
		var tempData = [];
		if(type == 'normal'){
			if(srting_name == '城市'){
				for(var i=0; i<15; i++){
					tempData.push({
						cityname:srting_name+(i+1),
						value:randomValue(),
						occupy_province:Math.random().toFixed(3)
					});
				}
			}else{
				var temp_sum = 0;
				for(var i=0; i<15; i++){
					var temp = randomValue();
					temp_sum += temp;
					tempData.push({
						cityname:srting_name+(i+1),
						value:temp,
						occupy_province: 0
					});
				}
				temp_sum = temp_sum*1.2;
				for (var i=0; i<15; i++) {
					tempData[i].occupy_province =  (tempData[i].value/temp_sum).toFixed(3);
				}
			}	
		}else if(type == 'pie'){
			for(var i=0; i<16; i++){
				if(i==15){
					tempData.push({
						name:'其他',
						value:randomValue()
					});
				}else{
					tempData.push({
						name:srting_name+(i+1),
						value:randomValue()
					});
				}

			}
		}
		return tempData;
	}

	//处理成绘图需要的数组格式
	function createGroupData(data_source){ 
		if(data_source[0].cityname){
			var tempGroup = {
				nameArr : [],
				valueArr : [],
				occupyArr : []
			};
			for( var i=0; i<data_source.length; i++){
		    	tempGroup.nameArr.push(data_source[i].cityname);
		    	tempGroup.valueArr.push(data_source[i].value);
		    	tempGroup.occupyArr.push((parseFloat(data_source[i].occupy_province)*100).toFixed(1));
			}	
		}else{
			var tempGroup = {
				nameArr : [],
				valueArr : []
			};
			for( var i=0; i<data_source.length; i++){
				if(i == data_source.length-1){
			    	tempGroup.nameArr.push('其他');
				}else{
			    	tempGroup.nameArr.push(data_source[i].name);
				}
			    tempGroup.valueArr.push(data_source[i].value);
			}	
		}

		return tempGroup;
	}


// ================= 1 中国公共WIFI布局一览图 ====================
	var china_wifi_layout = echarts.init(document.getElementById('china_wifi_layout'));
    var province_data = [
        {name: '北京', value: randomValue()},
        {name: '天津', value: randomValue()},
        {name: '上海', value: randomValue()},
        {name: '重庆', value: randomValue()},
        {name: '河北', value: randomValue()},
        {name: '河南', value: randomValue()},
        {name: '云南', value: randomValue()},
        {name: '辽宁', value: randomValue()},
        {name: '黑龙江', value: randomValue()},
        {name: '湖南', value: randomValue()},
        {name: '安徽', value: randomValue()},
        {name: '山东', value: randomValue()},
        {name: '新疆', value: randomValue()},
        {name: '江苏', value: randomValue()},
        {name: '浙江', value: randomValue()},
        {name: '江西', value: randomValue()},
        {name: '湖北', value: randomValue()},
        {name: '广西', value: randomValue()},
        {name: '甘肃', value: randomValue()},
        {name: '山西', value: randomValue()},
        {name: '内蒙古', value: randomValue()},
        {name: '陕西', value: randomValue()},
        {name: '吉林', value: randomValue()},
        {name: '福建', value: randomValue()},
        {name: '贵州', value: randomValue()},
        {name: '广东', value: randomValue()},
        {name: '青海', value: randomValue()},
        {name: '西藏', value: randomValue()},
        {name: '四川', value: randomValue()},
        {name: '宁夏', value: randomValue()},
        {name: '海南', value: randomValue()},
        {name: '台湾', value: randomValue()},
        {name: '香港', value: randomValue()},
        {name: '澳门', value: randomValue()}
    ];

    function calculateSum(){
    	var sum = 0;
    	for(var i=0; i<province_data.length; i++){
    		if(province_data[i].value){
    			sum += parseInt(province_data[i].value);
    		}
    	}
    	$('.sum').text('当前全国公共WiFi总数：'+sum);
    }
    calculateSum(province_data);

	china_wifi_layout.setOption({
	    tooltip: {},
	    visualMap: {
	        min: 0, 
	        max: 1500,  //wifi数量最大值 要改成动态
	        left: 'left', //组件位置
	        top: 'bottom',
	        text: ['最大值','最小值'],
	        seriesIndex: [1],
	        inRange: {
	            color: ['#e0ffff', '#006edd'] //颜色区间
	        },
	        calculable : true
	    },
	    geo: { 
	        map: 'china',
	        roam: true, //是否开启鼠标缩放和平移
	        label: {
	            normal: {
	                show: true,
	                textStyle: { //省份文字的颜色
	                    color: 'rgba(0,0,0,0.4)'
	                }
	            }
	        },
	        itemStyle: {
	            normal:{ //边框颜色
	                borderColor: '#ffffff'
	            },
	            emphasis:{ //省份多边形样式
	                areaColor: null,
	                shadowOffsetX: 0,
	                shadowOffsetY: 0,
	                shadowBlur: 20,
	                borderWidth: 0,
	                shadowColor: 'rgba(0, 0, 0, 0.5)'
	            }
	        }
	    },
	    series : [
	       	{
	           type: 'scatter',
	           coordinateSystem: 'geo'
	        },
	        {
	            name: 'WiFi总数',
	            type: 'map',
	            geoIndex: 0,
	            // tooltip: {show: false},
	            data: province_data
	        }
	    ]
	});



// ================= 2 公共WiFi排名前15的城市情况 ====================

	//数据格式
	// var testdata1 = [
	// 	{
	// 		cityname:"城市1",
	// 		value:'1350',
	// 		occupy_province:'0.239'
	// 	},
	// 	{
	// 		cityname:'城市2',
	// 		value:'1000',
	// 		occupy_province:'0.714'
	// 	}
	// ];

	var dataGroup = createGroupData(createRandom('normal','城市'));

	var city_wifi_rank = echarts.init(document.getElementById('city_wifi_rank'));
	city_wifi_rank.setOption({
	    tooltip: {
	        trigger: 'axis',
	        // axisPointer: {
	        //     type: 'cross',
	        //     crossStyle: {
	        //         color: '#999'
	        //     }
	        // },
	        formatter: function(params) { 
				var res = params[0].name+'<br/>'; 
				for(var i=0; i<params.length; i++){
					res += '<i class="color_point" style="background-color:'+params[i].color+';"></i>' + params[i].seriesName +'：' + params[i].value;
					i==1? res+='%' : res+='<br/>';
				}
				return res;  
	        }
	    },
	    legend: {
	        data:['城市WiFi数量','占所在省比例']
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: dataGroup.nameArr,
	            axisPointer: {
	                type: 'shadow'
	            }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: 'WiFi数量',
	            min: 0,
	            axisLabel: {
	               
	            }
	        },
	        {
	            type: 'value',
	            name: '占比',
	            axisLabel: {
	                formatter: '{value}%'
	            }
	        }
	    ],
        grid: {
            left: '3%',
            right: '2%',
            bottom: '3%',
            containLabel: true
        },
	    series: [
	        {
	            name:'城市WiFi数量',
	            type:'bar',
	            itemStyle:{
	                normal:{
	                    color: '#5b9bd5'
	                }
	            },
	            data:dataGroup.valueArr
	        },
	        {
	            name:'占所在省比例',
	            type:'line',
	            yAxisIndex: 1,
	            itemStyle:{
	                normal:{
	                    color: '#ed7d31'
	                }
	            },
	            data:dataGroup.occupyArr
	        }
	    ]
	});


	// ================= 3 前10的省份的前10的公共场景WiFi占比情况 ====================

	//数据未动态化
	var province_scene_occupy = echarts.init(document.getElementById('province_scene_occupy'));
	province_scene_occupy.setOption({
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data: ['场景1', '场景2','场景3','场景4','场景5']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    yAxis:  {
	        type: 'value'
	    },
	    xAxis: {
	        type: 'category',
	        data: ['浙江','安徽','江西','四川','湖北','广东','福建']
	    },
	    series: [
	        {
	            name: '场景1',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [320, 302, 301, 334, 390, 330, 320]
	        },
	        {
	            name: '场景2',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            name: '场景3',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [220, 182, 191, 234, 290, 330, 310]
	        },
	        {
	            name: '场景4',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [150, 212, 201, 154, 190, 330, 410]
	        },
	        {
	            name: '场景5',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [820, 832, 901, 934, 1290, 1330, 1320]
	        }
	    ]
	});

	// ================= 4 前15的场景公共WiFi数量在整体公共WiFi数量占比 ====================

	var dataPieSence = createRandom('pie','场景');

	console.log(createGroupData(dataPieSence));

	var scene_wifi_occupy = echarts.init(document.getElementById('scene_wifi_occupy'));
	scene_wifi_occupy.setOption({
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
			height:'380',
			padding: [10, 5, 5, 20],
	        data: createGroupData(dataPieSence).nameArr
	    },
	    series : [
	        {
	            name: 'WiFi数量',
	            type: 'pie',
	            radius : '65%',
	            center: ['55%', '50%'],
	            data: dataPieSence,
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	});


	// ================= 6 前10的运营商在前10的场景公共WiFi布局占比情况 ====================


	//数据未动态化
	var operator_scene_occupy = echarts.init(document.getElementById('operator_scene_occupy'));
	operator_scene_occupy.setOption({
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data: ['场景1', '场景2','场景3','场景4','场景5']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    yAxis:  {
	        type: 'value'
	    },
	    xAxis: {
	        type: 'category',
	        data: ['运营商1','运营商2','运营商3','运营商4','运营商5','运营商6','运营商7']
	    },
	    series: [
	        {
	            name: '场景1',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [320, 302, 301, 334, 390, 330, 320]
	        },
	        {
	            name: '场景2',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            name: '场景3',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [220, 182, 191, 234, 290, 330, 310]
	        },
	        {
	            name: '场景4',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [150, 212, 201, 154, 190, 330, 410]
	        },
	        {
	            name: '场景5',
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true
	                }
	            },
	            data: [820, 832, 901, 934, 1290, 1330, 1320]
	        }
	    ]
	});




});
