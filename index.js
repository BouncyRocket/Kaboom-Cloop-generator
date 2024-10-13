async function main() {
    // Dynamically import the clipboardy module
    const clipboardy = await import('clipboardy');
    const { writeSync } = clipboardy.default; // Access the default export

    function createCLoop(startupcommands,commands) {
        const baseCommand = {
            BlockState: { Name: "minecraft:redstone_block" },
            Time: 1,
            Passengers: [{
                id: "minecraft:blaze",
                DeathTime: 999,
                Health: 0,
                Passengers: [{
                    id: "minecraft:falling_block",
                    BlockState: { Name: "minecraft:activator_rail" },
                    Time: 1,
                    Passengers: []
                }]
            }]
        };

        // Add startup commands
        startupcommands.forEach(cmd => {
            baseCommand.Passengers[0].Passengers[0].Passengers.push({
                id: "minecraft:command_block_minecart",
                Command: cmd
            });
        });

        // Add user-specified commands
        commands.forEach(cmd => {
            baseCommand.Passengers[0].Passengers[0].Passengers.push({
                id: "minecraft:command_block_minecart",
                Command: cmd
            });
        });

        // Add cleanup commands
        baseCommand.Passengers[0].Passengers[0].Passengers.push(
            {
                id: "minecraft:command_block_minecart",
                Command: "setblock ~ ~1 ~ command_block{Command:\"fill ~ ~ ~ ~ ~-3 ~ air\",auto:1b}"
            },
            {
                id: "minecraft:command_block_minecart",
                Command: "kill @e[distance=..0.5]"
            }
        );

        return `/minecraft:summon falling_block ~ ~1 ~ ${JSON.stringify(baseCommand)}`;
    }

    const commands = [
        `setblock ~ ~-1 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~0 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~1 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~2 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~3 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~4 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~5 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~6 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~7 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~8 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~9 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~10 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~11 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~12 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~13 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~14 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~15 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~16 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~17 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~18 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~19 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~20 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~21 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~22 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~23 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~24 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~25 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~26 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~27 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~28 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~29 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~30 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~31 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`,
        `setblock ~ ~32 ~-2 minecraft:chain_command_block[facing=up]{Command:"",auto:1b}`
    ];

    if (commands.length > 34) {
        throw new Error("Too many commands, max is 34");
    }

    const startupcommands = [
        `setblock ~ ~-2 ~-1 minecraft:repeating_command_block[facing=up]{Command:"/minecraft:clone ~ ~ ~-1 ~ ~${commands.length} ~-1 ~ ~ ~"}`,
        `setblock ~ ~-2 ~-2 minecraft:repeating_command_block[facing=up]{Command:"/minecraft:clone ~ ~ ~-1 ~ ~${commands.length} ~-1 ~ ~ ~"}`,
        'setblock ~ ~-3 ~-1 minecraft:redstone_block',
        '/minecraft:summon minecraft:falling_block ~ ~7 ~ {BlockState:{Name:"observer",Properties:{facing:up}},Motion:[0.0,-2.0,0.0],DropItem:false}',
        '/minecraft:summon minecraft:falling_block ~ ~9 ~ {BlockState:{Name:"observer",Properties:{facing:down}},Motion:[0.0,-2.0,0.0],DropItem:false}'
    ];

    const cloopCommand = createCLoop(startupcommands,commands.filter(cmd => cmd !== ""));
    writeSync(cloopCommand); // Write the command to the clipboard
    console.log('Command copied to clipboard:', cloopCommand);
}

// Execute the main function
main().catch(err => console.error(err));