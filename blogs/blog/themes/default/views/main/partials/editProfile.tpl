<form id="formProfile" action="/main/profile" method="POST" class="form">
	
	<img class='avatar-img' src='http://www.gravatar.com/avatar/{request.user.data.gravatarHash}?d=mm&s=80' border=0/>

	<div class="form-group"><input type="text" name="User[gravatarEmail]" class="form-control" id="gravatarEmail" placeholder="Gravatar Email
	" value="{request.user.data.gravatarEmail}"></div>

	<div>Edit your bio</div>

	<div class="form-group"><input type="text" name="User[displayName]" class="form-control" id="displayName" placeholder="Display Name" value="{request.user.data.displayName}"></div>

	<div class="form-group"><textarea name="User[bio]" class="form-control" id="bio" placeholder="About You">{request.user.data.bio}</textarea></div>

	<div class="form-group"><input type="password" name="User[password]" class="form-control" id="password" placeholder="New password" value=""></div>

	<input type='submit' id='submitProfile' class="btn btn-primary pull-right" name="submit" value='SAVE'/>
	<input type='button' id='cancelProfile' class="btn pull-right" name="submit" value='CANCEL'/>
</form>