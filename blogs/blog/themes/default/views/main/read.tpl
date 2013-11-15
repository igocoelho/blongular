{#posts}
<div class='row post'>
	<div class="visible-lg col-lg-2 user-info">
		{>main-userpost/}
	</div>
	<div class="col-lg-8 user-container" ng-controller="CtrlPost" ng-init="setId('{_id}')">
		{>main-post/}
	</div>
</div>
{/posts}