import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CookView } from './cookView';

declare class CookPlugin extends Plugin {
  settings: CookLangSettings;
  reloadCookViews(): void;
}

export class CookLangSettings {
  showImages: boolean = true;
  showIngredientList: boolean = true;
  showCookwareList: boolean = true;
  showTimersList: boolean = false;
  showTotalTime: boolean = true;
  showTimersInline: boolean = true;
  showQuantitiesInline: boolean = false;
  timersTick: boolean = true;
  timersRing: boolean = true;
}

export class CookSettingsTab extends PluginSettingTab {
  plugin: CookPlugin;
  constructor(app: App, plugin: CookPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {  
    
    new Setting(containerEl)
      .setName('Inline interactive timers')
      .setDesc('Allow clicking on a time in a recipe method to start a timer')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showTimersInline)
        .onChange((value: boolean) => {
          this.plugin.settings.showTimersInline = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName('Running Timers Tick')
      .setDesc('Play a ticking sound while a timer is running')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.timersTick)
        .onChange((value: boolean) => {
          this.plugin.settings.timersTick = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName('Alarm When Timers End')
      .setDesc('Play a ring sound when a running timer finishes')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.timersRing)
        .onChange((value: boolean) => {
          this.plugin.settings.timersRing = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));
  }
}
