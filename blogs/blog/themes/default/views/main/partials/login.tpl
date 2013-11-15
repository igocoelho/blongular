<form id="formLogin" method="POST" action='/main/login' class="form">

	<div class="form-group"><input type="email" name="email" class="form-control" id="authUser" placeholder="Email Address"></div>

	<div class="form-group"><input type="password" name="password" class="form-control" id="authPass" placeholder="Password"></div>

	<input type='submit' class="btn btn-primary pull-right" name="submit" value='LOGIN'/>
	<input type="hidden" name="redirect" value="{request.url}">

</form>