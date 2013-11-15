<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{view.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{self.desc}">

    <!-- STYLESHEET -->
    <link href="/css/blongular.css" rel="stylesheet"/>
    
  </head>
  <body>

    <!-- ALERT SYSTEM -->
    
    <div id='blng-alert' ng-controller="CtrlAlert" class="alert"></div>

    <!-- EDITOR -->

    {>main-editor/}

    <!-- BEGIN OF HEADER -->

    {>main-header/}

    <!-- BEGIN OF CONTENT -->

    <div class="container">
      {content}
    </div>

    <!-- BEGIN OF FOOTER -->
    <footer class="footer" role="contentinfo">
      <div class="container">
        Proudly running on <a href='http://blongular.com/'>Blongular</a>
      </div>
    </footer>

    <!-- MANUAL SCRIPTS -->
    <script type='text/javascript' src='/js/blongular.js'></script>

    <!-- AUTO EMBED SCRIPTS -->
    <[SCRIPT]>

  </body>
</html>