<div class="post-body">

    <div class='post-info text-muted'>
    	{#publishDate}{publishDate_full} {:else}Not published {/publishDate}{#primaryTag}on <a href='/tag/{.}'>{.}</a>{/primaryTag}
    </div>
    <h1 class='post-title editable' ng-model="title">{title}</h1>
    <div class='post-content editable' ng-model="content">
        {content}
    </div>
    <hr>

</div>