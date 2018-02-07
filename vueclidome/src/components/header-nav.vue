<template>
	<div id="header">
		<div class="nav-global">
			<div class="container">
				<h1 class="nav-logo">
					<a href="javascript:;"></a>
				</h1>
				<ul class="nav-aside">
					<li class="nav-user">
					  	<a href="/">个人中心</a>
						<!--active-->
						<div class="nav-user-wrapper">
							<div class="nav-user-list">
								<dl class="nav-user-avatar">
									<dd><span class="ng-scope"></span></dd>
									<dt class="ng-binding">+86 180****7713</dt>
								</dl>
								<ul>
									<router-link :to="{path:'/account'}" tag="li" class="order"><a>我的订单</a></router-link>
									<router-link :to="{path:'/account/address'}" tag="li" class="address"><a>收货地址</a></router-link>
								</ul>
							</div>
						</div>
					</li>
					<!--active-->
					<car-panel></car-panel>
				</ul>
				<ul class="nav-list">
					<li><a href="javascript:;">在线商城</a></li>
					<li><a href="javascript:;">坚果 Pro</a></li>
					<li><a href="javascript:;">Smartisan M1 / M1L</a></li>
					<li><a href="javascript:;">Smartisan OS</a></li>
					<li><a href="javascript:;">欢喜云</a></li>
					<li><a href="javascript:;">应用下载</a></li>
					<li><a href="javascript:;">官方论坛</a></li>
				</ul>
			</div>
		</div>
		<div class="nav-sub">
			<div class="nav-sub-wrapper">
				<div class="container">
					<ul class="nav-list">
						<li><a href="javascript:;">首页</a></li>
						<li><a href="javascript:;">手机</a></li>
						<li><a href="javascript:;">“足迹系列”手感膜</a></li>
						<li><router-link :to="{path:'/'}">官方配件</router-link></li>
						<li><a href="javascript:;">周边产品</a></li>
						<li><a href="javascript:;">第三方配件</a></li>
						<li><a href="javascript:;">全部商品</a></li>
						<li><a href="javascript:;">服务</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import carPanel from '@/components/car-panel'

export default {
	components: {
		carPanel
	}
}
</script>
