"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheEnableModule = exports.CacheDisableModule = void 0;
const command_module_1 = require("../../../command-builder/command-module");
const utilities_1 = require("../utilities");
class CacheDisableModule extends command_module_1.CommandModule {
    constructor() {
        super(...arguments);
        this.command = 'disable';
        this.aliases = 'off';
        this.describe = 'Disables persistent disk cache for all projects in the workspace.';
        this.scope = command_module_1.CommandScope.In;
    }
    builder(localYargs) {
        return localYargs;
    }
    run() {
        return (0, utilities_1.updateCacheConfig)(this.getWorkspaceOrThrow(), 'enabled', false);
    }
}
exports.CacheDisableModule = CacheDisableModule;
class CacheEnableModule extends command_module_1.CommandModule {
    constructor() {
        super(...arguments);
        this.command = 'enable';
        this.aliases = 'on';
        this.describe = 'Enables disk cache for all projects in the workspace.';
        this.scope = command_module_1.CommandScope.In;
    }
    builder(localYargs) {
        return localYargs;
    }
    run() {
        return (0, utilities_1.updateCacheConfig)(this.getWorkspaceOrThrow(), 'enabled', true);
    }
}
exports.CacheEnableModule = CacheEnableModule;
      while (directoriesStack.length) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const dirPath = directoriesStack.pop();
            let entries = [];
            try {
                entries = await fs_1.promises.readdir(dirPath);
            }
            catch { }
            for (const entry of entries) {
                const entryPath = (0, path_1.join)(dirPath, entry);
                const stats = await fs_1.promises.stat(entryPath);
                if (stats.isDirectory()) {
                    directoriesStack.push(entryPath);
                }
                size += stats.size;
            }
        }
        return this.formatSize(size);
    }
    formatSize(size) {
        if (size <= 0) {
            return '0 bytes';
        }
        const abbreviations = ['bytes', 'kB', 'MB', 'GB'];
        const index = Math.floor(Math.log(size) / Math.log(1024));
        const roundedSize = size / Math.pow(1024, index);
        // bytes don't have a fraction
        const fractionDigits = index === 0 ? 0 : 2;
        return `${roundedSize.toFixed(fractionDigits)} ${abbreviations[index]}`;
    }
    effectiveEnabledStatus() {
        const { enabled, environment } = (0, utilities_1.getCacheConfig)(this.context.workspace);
        if (enabled) {
            switch (environment) {
                case 'ci':
                    return environment_options_1.isCI;
                case 'local':
                    return !environment_options_1.isCI;
            }
        }
        return enabled;
    }
}
exports.CacheInfoCommandModule = CacheInfoCommandModule;
