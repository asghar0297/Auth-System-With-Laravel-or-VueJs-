<?php

namespace App\Traits;
use Carbon\Carbon;

trait ApiResponser{

    protected function success($data, string $message = null, int $code = 200)
	{
		return response()->json([
			'status' => 'Success',
			'message' => $message,
			'result' => $data
		], $code);
	}

    protected function error(string $message = null, int $code, $data = null)
	{
		return response()->json([
			'status' => 'Error',
			'message' => $message,
			'result' => $data
		], $code);
	}
}
