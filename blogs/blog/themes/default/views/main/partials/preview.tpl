<div class="post-body">
    <div class='post-info text-muted'>
    		{#publishDate}{publishDate_full} {:else}Not published {/publishDate}{#primaryTag}on <a href='/tag/{.}'>{.}</a>{/primaryTag}
    </div>
    <a href='/post/{_id}'><h1 class='post-title'>{title}</h1></a>
    <div class='post-content'>
        {preview}
    </div>
</div>