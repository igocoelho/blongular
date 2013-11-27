<!-- LEFT CONTROLS -->
<div class='controls'>

	{#posts._id}
	<ul class="nav" id="back" style='display:block;'>
	    <li>
	    	<div><a class="btn btn-lightgray navBtn" href='/' id="homeBtn" data-toggle="tooltip" title="Home"><span class="glyphicon glyphicon-home"></a></div>
	    </li>
	    <li>
	    	<div><span class="btn btn-gray navBtn" onclick="window.history.back();" id="backBtn" data-toggle="tooltip" title="Back"><span class="glyphicon glyphicon-chevron-left"></span></div>
	    </li>
	</ul>
	{/posts._id}

</div>

<!-- RIGHT CONTROLS -->
<div class='controls pull-right'>

	<!-- USER LOGIN/LOGOUT/EDIT PROFILE -->
	<ul class="nav">
		{#request.logged}
	    <li style='margin-left:0px;'>
	    	<a class="btn btn-lightgray navBtn" href='/main/logout' id="logoffBtn" data-toggle="tooltip" title="Log out"><span class="glyphicon glyphicon-log-out"></span></a>
	    </li>
		{/request.logged}
	    <li class="dropdown" id="login">
	        <a class="btn btn-gray dropdown-toggle navBtn pull-right {#request.logged}visible-lg{/request.logged}" id="loginBtn" href="#" data-toggle="dropdown" id="navLogin">
	            <span class="glyphicon glyphicon-user"></span>
	            {#request.user.data.displayName}
	                <span class='nav-label'>{.}</span>
	            {/request.user.data.displayName}
	        </a>
	        {#request.logged}
	        <div class="dropdown-menu pull-right" id='navForm'>
	            {>main-editProfile/}
	        </div>
	        {:else}
	        <div class="dropdown-menu pull-right" id='navForm'>
	            {>main-login/}
	        </div>
	        {/request.logged}
	    </li>
	</ul>

	<!-- POST ACTIONS -->
	<ul class="nav" id="post-actions">
		<li>
			<div><a class="btn btn-danger navBtn" href='/delete/{self.postId}' id="removeBtn" data-toggle="tooltip" title="Delete this post"><span class="glyphicon glyphicon-trash"></span></a></div>
		</li>
		<li>
			<div class="btn btn-gray navBtn" id="unpublishBtn" data-toggle="tooltip" title="Unpublish post"><span class="glyphicon glyphicon-globe"></span></div>
			<div class="btn btn-default navBtn" id="publishBtn" data-toggle="tooltip" title="Publish post"><span class="glyphicon glyphicon-globe"></span></div>
		</li>
		<li>
			<div class="btn btn-primary navBtn" id="editBtn" data-toggle="tooltip" title="Edit this post"><span class="glyphicon glyphicon-pencil"></span></div>
		</li>
	</ul>

	<!-- POST EDITING ACTIONS -->
	<ul class="nav" id="edit">
		<li>
			<div class="btn btn-danger navBtn" id="cancelBtn" data-toggle="tooltip" title="Cancel changes"><span class="glyphicon glyphicon-remove"></span></div>
		</li>
		<li>
			<div class="btn btn-gray navBtn" id="htmlBtn" data-toggle="tooltip" title="Edit as HTML"><span class="glyphicon glyphicon-header"></span></div>
		</li>
		<li>
			<div class="btn btn-default navBtn" id="textBtn" data-toggle="tooltip" title="Edit as TEXT"><span class="glyphicon glyphicon-font"></span></div>
		</li>
		<li>
			<div class="btn btn-success navBtn" id="saveBtn" data-toggle="tooltip" title="Save changes"><span class="glyphicon glyphicon-ok"></span></div>
		</li>
	</ul>

	<!-- CREATE POST -->
	<ul class="nav" id="actions">
		<li>
			<div><a class="btn btn-success navBtn" href='/new' id="addBtn" data-toggle="tooltip" title="Create post"><span class="glyphicon glyphicon-plus"></span></a></div>
		</li>
	</ul>

</div>