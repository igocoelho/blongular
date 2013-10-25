<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{view.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{self.desc}">

    <!-- STYLESHEET -->
    <link href="/css/bootstrap.css" rel="stylesheet">
    <link href="/css/medium-editor.css" rel="stylesheet">
    <link href="/css/blog.css" rel="stylesheet">
    <link href="/css/editor.css" rel="stylesheet">

    <script type='text/javascript' src='/angular.app.js'></script>
  </head>
  <body>

    {#request.logged}
    <ul class="nav controls pull-right" id="user" style='display:block;'>
      <li class='pull-right'>
        <div><a class="btn btn-lightgray navBtn" href='/main/logout' id="logoffBtn" style='margin-left:-9px;' data-toggle="tooltip" title="Log out"><span class="glyphicon glyphicon-log-out"></span></a></div>
      </li>
    </ul>
    {:else}

    {/request.logged}
    <ul class="nav controls pull-right">
      <li class="dropdown" id="login" style="clear: both;">
        <a class="btn btn-gray dropdown-toggle navBtn pull-right" id="loginBtn" href="#" data-toggle="dropdown" id="navLogin">
          <span class="glyphicon glyphicon-user"></span>
          {#request.user.data.name}<span class='nav-label'>{.}</span>{/request.user.data.name}
        </a>
        {#request.logged}
        {:else}
        <div class="dropdown-menu pull-right" id='navForm'>
          <form id="formLogin" method="POST" action='/main/login' class="form">
            <div class="form-group"><input type="email" name="email" class="form-control" id="authUser" placeholder="Email Address"></div>
            <div class="form-group"><input type="password" name="password" class="form-control" id="authPass" placeholder="Password"></div>
            <input type='submit' class="btn btn-primary pull-right" name="submit" value='LOGIN'/>
            <input type="hidden" name="redirect" value="{request.url}">
          </form>
        </div>
        {/request.logged}
      </li>
    </ul>

    {>main-controls/}

    <div class="jumbotron">
      <a href='/'><h1 class='text-center'>{app.title}</h1></a>
    </div>

    <div class="container">
      {content}
    </div>

    <!-- Don't remove this -->
    <[SCRIPT]>

  </body>
</html>