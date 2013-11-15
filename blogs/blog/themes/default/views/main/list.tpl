{#posts}
<div class="row col-lg-8 post preview">
	{>main-preview/}
	{@sep}<div class='post-div'><hr></div>{/sep}
</div>
{:else}
<div class="row col-lg-8 post preview">
	<h3>Sorry, could not find more posts...</h3>
</div>
{/posts}

<div class='row col-lg-8 centered' style='text-align:center'>
	<hr>
	{#pageBack}<a href='/{.}/' class='btn btn-default'>Back</a>{/pageBack} &nbsp;
	{#pageNext}<a href='/{.}/' class='btn btn-default'>Next</a>{/pageNext}
</div>