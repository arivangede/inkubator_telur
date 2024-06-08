<?php

namespace App\Http\Controllers;

use App\Models\Control;
use App\Models\Iot;
use App\Models\Mode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IotController extends Controller
{
    public function receiveData(Request $request)
    {
        $temperature = $request->input('temperature');
        $humidity = $request->input('humidity');

        // Simpan data sensor ke database
        Iot::create([
            'suhu' => $temperature,
            'kelembaban' => $humidity,
        ]);

        // Mengembalikan respons
        return response()->json(['message' => 'Data diterima dengan sukses'], 200);
    }

    public function displayData()
    {
        $data = Iot::orderBy('id', 'desc')->first();

        return response()->json(['data' => $data]);
    }

    public function getSensorsHistory()
    {
        $data = Iot::orderBy('id', 'desc')->get();

        return response()->json(['data' => $data]);
    }

    public function writeCommandMode(Request $request)
    {
        $mode = $request->input('command');

        $lastState = Mode::orderBy('id', 'desc')->first();

        if ($mode == 'otomatis' && $lastState !== null && $lastState->command == 'otomatis') {
            return response()->json(['message' => 'tidak mengirim data karena lastState sama'], 304);
        }

        Mode::create([
            'command' => $mode
        ]);

        return response()->json(['message' => 'sukses menulis command mode baru']);
    }

    public function getMode()
    {
        $mode = Mode::select('command')->orderBy('id', 'desc')->first();

        return response()->json(['command' => $mode->command]);
    }

    public function writeControl(Request $request)
    {
        $kipas = $request->input('kipas');
        $lampu = $request->input('lampu');

        $lastState = Control::orderBy('id', 'desc')->first();

        if ($kipas == 'mati' && $lampu == 'mati' && $lastState->kipas == 'mati' && $lastState->lampu == 'mati') {
            return response()->json(['message' => 'tidak mengirim data karena lastState sama'], 304);
        }

        Control::create([
            'kipas' => $kipas,
            'lampu' => $lampu
        ]);

        return response()->json(['message' => 'sukses menulis command mode baru']);
    }

    public function getControl()
    {
        $control = Control::select('kipas', 'lampu')->orderBy('id', 'desc')->first();

        return response()->json(['control' => $control]);
    }
}
