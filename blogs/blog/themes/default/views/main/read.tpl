{#posts}
	<div class='row post'>
		<div class="col-lg-2 user-info" ng-controller="CtrlPost" ng-init="setId('{_id}')">
			{>main-userpost/}
		</div>
		<div class="col-lg-8 user-container" ng-controller="CtrlPost" ng-init="setId('{_id}')">
			{>main-post/}
		</div>
	</div>
{/posts}