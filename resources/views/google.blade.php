<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="root">
</div>

<script>
    @if (isset($token))
        localStorage.setItem('apitoken', "{{$token}}")
        location.href = '/';
    @endif
    @if (isset($googleUser))
        location.href = '/completeregister/{{$googleUser->getId()}}/{{$googleUser->getEmail()}}';
    @endif
</script>
</body>
</html>
