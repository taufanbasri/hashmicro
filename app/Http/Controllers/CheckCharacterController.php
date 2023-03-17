<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CheckCharacterController extends Controller
{
    public function calculate(Request $request)
    {
        $input1 = $request->input('input1');
        $input2 = $request->input('input2');

        $totalChars = strlen($input1);
        $matchedChars = 0;

        for ($i = 0; $i < $totalChars; $i++) {
            if (Str::contains($input2, $input1[$i])) {
                $matchedChars++;
            }
        }

        $percentage = $matchedChars / $totalChars * 100;

        return response()->json(['percentage' => $percentage]);
    }
}
