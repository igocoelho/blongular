<ul class="nav controls pull-right" id="post-actions">
	<li class='pull-right'>
		<dvi><a class="btn btn-danger navBtn" href='/delete/{self.postId}' id="removeBtn" data-toggle="tooltip" title="Delete this post"><span class="glyphicon glyphicon-trash"></span></a></div>
	</li>
	<li class='pull-right'>
		{#posts[0].publishDate}
		<div class="btn btn-gray navBtn" id="unpublishBtn" data-toggle="tooltip" title="Unpublish post"><span class="glyphicon glyphicon-globe"></span></div>
		{:else}
		<div class="btn btn-default navBtn" id="publishBtn" data-toggle="tooltip" title="Publish post"><span class="glyphicon glyphicon-globe"></span></div>
		{/posts[0].publishDate}
	</li>
	<li class='pull-right'>
		<div class="btn btn-primary navBtn" id="editBtn" data-toggle="tooltip" title="Edit this post"><span class="glyphicon glyphicon-pencil"></span></div>
	</li>
</ul>

<ul class="nav controls pull-right" id="edit">
	<li class='pull-right'>
		<div class="btn btn-danger navBtn" id="cancelBtn" data-toggle="tooltip" title="Cancel changes"><span class="glyphicon glyphicon-remove"></span></div>
	</li>
	<li class='pull-right'>
		<div class="btn btn-success navBtn" id="saveBtn" data-toggle="tooltip" title="Save changes"><span class="glyphicon glyphicon-ok"></span></div>
	</li>
</ul>

<ul class="nav controls pull-right" id="actions">
	<li class='pull-right'>
		<div><a class="btn btn-success navBtn" href='/new' id="addBtn" data-toggle="tooltip" title="Create post"><span class="glyphicon glyphicon-plus"></span></a></div>
	</li>
</ul>