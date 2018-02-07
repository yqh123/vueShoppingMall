import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state: {
		carPanelData: [],
		maxOff: false,
		carShow: false,
		carTime: null,
		ball: {
			show: false,
			el: null,
			img: ''
		},
		receiveInfo: [
			{
		      'name': '隔壁大爷',
		      'phone': '18058427713',
		      'areaCode': '010',
		      'landLine': '64627856',
		      'provinceId': 110000,
		      'province': '浙江省',
		      'cityId': 110100,
		      'city': '杭州市',
		      'countyId': 110106,
		      'county': '江干区',
		      'add': '下沙街道，铭都雅苑11栋1单元1701',
		      'default': true,
		      'checked': true
		    },{
		      'name': '隔壁大妈',
		      'phone': '18058427713',
		      'areaCode': '010',
		      'landLine': '64627856',
		      'provinceId': 110000,
		      'province': '浙江省',
		      'cityId': 110100,
		      'city': '杭州市',
		      'countyId': 110106,
		      'county': '江干区',
		      'add': '下沙街道，铭都雅苑11栋1单元1702',
		      'default': false,
		      'checked': false
		    }
		],
		orderData: []
	},
	getters: {
		totleCount (state) {
			let counts = 0
			state.carPanelData.forEach((goods)=>{
				counts += goods.count
			})
			return counts
		},
		totlePrice (state) {
			let prices = 0
			state.carPanelData.forEach((goods)=>{
				prices += goods.count * goods.price
			})
			return prices
		},
		allChecked (state) {
			let allChecked = true
			state.carPanelData.forEach((goods)=>{
				if (!goods.checked) {
					allChecked = false
					return
				}
			})
			return allChecked
		},
		allcheckedNum (state) {
			let allNum = 0;
			state.carPanelData.forEach((goods) => {
	          	if (goods.checked) {
	          		allNum++
	          	}
	        })
			return allNum
		},
		allcheckedPrice (state) {
			let allPrice = 0;
			state.carPanelData.forEach((goods) => {
	          	if (goods.checked) {
	          		allPrice += goods.count*goods.price
	          	}
	        })
			return allPrice
		},
		checkedGoods (state) {
			let arrData = []
			state.carPanelData.forEach((goods) => {
	          	if (goods.checked) {
	          		arrData.push(goods)
	          	}
	        })
			return arrData
		},
		filterCheckedAdd (state) {
			let add = {}
			state.receiveInfo.forEach((goods) => {
				if (goods.default) {
					add = goods
				}
			})
			return add
		}
	},
	mutations: {
		addCarPanelData (state,data) {
			let bOff = true
			state.carPanelData.forEach((goods)=>{
				if( goods.sku_id === data.info.sku_id ){
					goods.count += data.count
					bOff = false
					if (goods.count > goods.limit_num) {
						state.maxOff = true
						goods.count = goods.limit_num
						return false
					}
					state.carShow = true
					// 显示"加入购物车"动画小球
					state.ball.show = true
					state.ball.img = data.info.ali_image
					state.ball.el = event.path[0]
				}
			})
			if (bOff) {
				let goodsData = data.info
				Vue.set(goodsData, 'count', data.count)
				Vue.set(goodsData, 'checked', true)
				state.carPanelData.push(goodsData)
				state.carShow = true

				// 显示"加入购物车"动画小球
				state.ball.show = true
				state.ball.img = data.info.ali_image
				state.ball.el = event.path[0]
			}
		},
		plusCarPanelData (state,id) {
			state.carPanelData.forEach((goods)=>{
				if (Number(goods.sku_id) === Number(id)) {
					if (goods.count >= goods.limit_num) {
						state.maxOff = true
						return
					}
					goods.count++
				}
			})
		},
		subCarPanelData (state,id) {
			state.carPanelData.forEach((goods)=>{
				if (Number(goods.sku_id) === Number(id)) {
					if (goods.count <=1) {
						return
					}
					goods.count--
				}
			})
		},
		delCarPanelData (state,id) {
			state.carPanelData.forEach((goods, index)=>{
				if (goods.sku_id === id) {
					state.carPanelData.splice(index,1)
					return
				}
			})
		},
		closePrompt (state) {
			state.maxOff = false
		},
		showPrompt (state) {
			state.maxOff = true
		},
		mouseShow (state) {
			clearTimeout(state.carTime)
			state.carShow = true
		},
		mouseHidden (state) {
			state.carTime = setTimeout(()=>{
				state.carShow = false
			},500)
		},
		checkGoods (state, id) {
			state.carPanelData.forEach((goods)=>{
				if (Number(goods.sku_id) === Number(id)) {
					goods.checked = !goods.checked
					return
				}
			})
		},
		allcheckGoods (state, checked) {
			if (checked) {
				state.carPanelData.forEach((goods) => {
		          goods.checked = false
		        })
			} else {
				state.carPanelData.forEach((goods) => {
		          goods.checked = true
		        })
			}
		},
		removeCheckedGoods (state) {
			let i = state.carPanelData.length
	      	while(i--){
	        	if(state.carPanelData[i].checked){
	          		state.carPanelData.splice(i,1)
	        	}
	      	}
		},
		changeReceiveIndex (state, index) {
			state.receiveInfo.forEach((goods) => {
				goods.default = false
			})
			Vue.set(state.receiveInfo[index], 'default', true)
		},
		submitReceiveGoods (state, data) {
			if (data.default) {
				state.receiveInfo.forEach((goods) => {
					goods.default = false
				})
			}
			state.receiveInfo.push(data)
		},
		submitOrderData (state, data) {
			state.orderData.unshift(data)
			let i = state.carPanelData.length
			while (i--) {
				if (state.carPanelData[i].checked) {
					state.carPanelData.splice(i, 1)
				}
			}
		},
		payNow (state, id) {
			state.orderData.forEach((goods) => {
				if (goods.orderId === id) {
					goods.isPay = true
					return
				}
			})
		}
	}
});

export default store;