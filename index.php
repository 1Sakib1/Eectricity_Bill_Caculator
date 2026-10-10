<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electricity Bill Calculator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #f6f8fd 0%, #f1f6fd 100%);
            min-height: 100vh;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.05);
        }
    </style>
</head>
<body class="flex items-center justify-center p-4 font-sans text-gray-800">

    <?php
    $units = '';
    $bill = '';
    $error = '';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $units = $_POST['units'];

        if (empty($units) || $units < 0) {
            $error = "Please enter a valid positive number for units.";
        } else {
            // Sample calculation logic
            // First 50 units: $3.50/unit
            // Next 100 units: $4.00/unit
            // Next 100 units: $5.20/unit
            // Above 250 units: $6.50/unit
            $total = 0;
            $remaining_units = $units;

            if ($remaining_units <= 50) {
                $total = $remaining_units * 3.50;
            } elseif ($remaining_units <= 150) {
                $total = (50 * 3.50) + (($remaining_units - 50) * 4.00);
            } elseif ($remaining_units <= 250) {
                $total = (50 * 3.50) + (100 * 4.00) + (($remaining_units - 150) * 5.20);
            } else {
                $total = (50 * 3.50) + (100 * 4.00) + (100 * 5.20) + (($remaining_units - 250) * 6.50);
            }

            $bill = number_format($total, 2);
        }
    }
    ?>

    <div class="glass-card rounded-3xl w-full max-w-md overflow-hidden relative">
        <!-- Header -->
        <div class="bg-blue-600 p-8 text-white text-center relative overflow-hidden">
            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500 rounded-full opacity-50"></div>
            <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-blue-700 rounded-full opacity-50"></div>
            
            <i class="fas fa-bolt text-4xl mb-3 text-yellow-300"></i>
            <h1 class="text-2xl font-bold mb-1 tracking-tight">Smart Bill Calculator</h1>
            <p class="text-blue-100 text-sm opacity-90">Calculate your electricity costs instantly</p>
        </div>

        <!-- Form Content -->
        <div class="p-8">
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                <div class="mb-6 relative">
                    <label for="units" class="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Electricity Usage</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i class="fas fa-tachometer-alt text-gray-400"></i>
                        </div>
                        <input type="number" step="0.1" name="units" id="units" 
                               class="block w-full pl-11 pr-16 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-blue-500 transition-colors text-lg font-medium text-gray-700 bg-gray-50 focus:bg-white" 
                               placeholder="0.0" value="<?php echo htmlspecialchars($units); ?>">
                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <span class="text-gray-400 font-semibold">kWh</span>
                        </div>
                    </div>
                    <?php if($error): ?>
                        <p class="text-red-500 text-sm mt-2 flex items-center gap-1"><i class="fas fa-exclamation-circle"></i> <?php echo $error; ?></p>
                    <?php endif; ?>
                </div>

                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-blue-600/30 flex justify-center items-center gap-2">
                    <i class="fas fa-calculator"></i> Calculate Bill
                </button>
            </form>

            <!-- Result -->
            <?php if($bill !== '' && empty($error)): ?>
            <div class="mt-8 bg-green-50 rounded-2xl p-6 border border-green-100 animate-[fadeIn_0.5s_ease-out]">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-green-800 font-semibold text-sm uppercase tracking-wide">Total Amount Due</span>
                    <i class="fas fa-check-circle text-green-500 text-xl"></i>
                </div>
                <div class="text-4xl font-black text-green-600">
                    <span class="text-2xl">$</span><?php echo $bill; ?>
                </div>
                <p class="text-green-700 text-sm mt-2 opacity-80">Based on <?php echo htmlspecialchars($units); ?> kWh usage</p>

                <div class="mt-4 pt-4 border-t border-green-200/50">
                    <p class="text-xs text-green-800 font-semibold uppercase mb-2">Tier Breakdown</p>
                    <ul class="text-sm text-green-700 space-y-1 opacity-90">
                        <?php if ($units > 0): ?>
                            <li class="flex justify-between">
                                <span>First 50 units (x $3.50)</span>
                                <span>$<?php echo number_format(min(50, $units) * 3.50, 2); ?></span>
                            </li>
                        <?php endif; ?>
                        <?php if ($units > 50): ?>
                            <li class="flex justify-between">
                                <span>Next 100 units (x $4.00)</span>
                                <span>$<?php echo number_format(min(100, $units - 50) * 4.00, 2); ?></span>
                            </li>
                        <?php endif; ?>
                        <?php if ($units > 150): ?>
                            <li class="flex justify-between">
                                <span>Next 100 units (x $5.20)</span>
                                <span>$<?php echo number_format(min(100, $units - 150) * 5.20, 2); ?></span>
                            </li>
                        <?php endif; ?>
                        <?php if ($units > 250): ?>
                            <li class="flex justify-between">
                                <span>Above 250 units (x $6.50)</span>
                                <span>$<?php echo number_format(($units - 250) * 6.50, 2); ?></span>
                            </li>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
            <?php endif; ?>
        </div>
    </div>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</body>
</html>
