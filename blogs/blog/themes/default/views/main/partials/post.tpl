<div class="post-body">

    <div class='post-info text-muted'>
    	<span data-name="publishDate">{#publishDate}{publishDate_full}{:else}Not published{/publishDate}</span>
    	<span class='post-url'>&nbsp;as "<span class='post-slug editable' data-name="slug" data-disable-return=1 data-disable-toolbar=1>{slug}</span>"</span>
    </div>

    <h1 class='post-title editable' data-placeholder='Type your title' data-disable-return=1 data-disable-toolbar=1 data-name="title">{title}</h1>
    <h2 class='post-subtitle editable' data-placeholder='Type your subtitle' data-disable-return=1 data-disable-toolbar=1 data-name="subtitle">{subtitle}</h2>
    <div class='post-content editable' data-placeholder='Type your post' data-name="content">
        {content}
    </div>
    
    <hr>

    {#abc}<script src="https://gist.github.com/pedronasser/af2e081e43fa8a37f4b8.js"></script>{/abc}

</div>