<div class="post-body">
    <div class='post-info text-muted'>
    	{#publishDate}{publishDate_full} {:else}Not published {/publishDate}
    </div>
    <h1 class='post-title'><a href='/post/{#slug}{.}{:else}{_id}{/slug}'>{listTitle}</a></h1>
    <div class='post-content'>
        {preview}
    </div>
</div>