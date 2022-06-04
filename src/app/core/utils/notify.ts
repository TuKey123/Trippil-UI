import notify from 'devextreme/ui/notify';
import { confirm, alert, custom } from 'devextreme/ui/dialog';
export class AppNotify {
  static delayTime: number = 3500;

  static info(message: string) {
    notify(message, 'info', this.delayTime);
  }

  static warning(message: string) {
    notify(message, 'warning', this.delayTime);
  }

  static error(message: string) {
    notify(message, 'error', this.delayTime);
  }

  static success(message: string) {
    notify(message, 'success', this.delayTime);
  }

  static confirm(message: string, title: string): Promise<boolean> {
    return confirm(message, title);
  }

  static confirmPopup(
    message: string,
    title: string,
    textYes: string,
    textNo: string
  ): Promise<boolean> {
    const messageHtml =
      '' +
      `<svg width="70" height="68" viewBox="0 0 70 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M67.278 55.1744L40.2696 6.89439C39.732 5.93218 38.937 5.12879 37.9685 4.56896C37 4.00913 35.8939 3.71362 34.7669 3.71362C33.6399 3.71362 32.5337 4.00913 31.5652 4.56896C30.5967 5.12879 29.8017 5.93218 29.2641 6.89439L2.27519 55.1744C1.74149 56.1027 1.46763 57.1507 1.48093 58.214C1.49423 59.2772 1.79423 60.3184 2.351 61.2339C2.90777 62.1493 3.70187 62.907 4.6541 63.4313C5.60633 63.9557 6.68342 64.2284 7.77797 64.2222H61.7752C62.8586 64.2211 63.9232 63.9469 64.8649 63.4265C65.8065 62.9061 66.5931 62.1572 67.1476 61.253C67.7022 60.3489 68.0057 59.3204 68.0285 58.2682C68.0514 57.216 67.7927 56.176 67.278 55.2499V55.1744ZM32.278 18.8888C32.278 18.1875 32.5648 17.5149 33.0753 17.0189C33.5858 16.523 34.2782 16.2444 35.0002 16.2444C35.7222 16.2444 36.4146 16.523 36.9251 17.0189C37.4356 17.5149 37.7224 18.1875 37.7224 18.8888V41.5555C37.7224 42.2569 37.4356 42.9295 36.9251 43.4254C36.4146 43.9213 35.7222 44.1999 35.0002 44.1999C34.2782 44.1999 33.5858 43.9213 33.0753 43.4254C32.5648 42.9295 32.278 42.2569 32.278 41.5555V18.8888ZM35.0002 56.3833C34.308 56.3833 33.6313 56.1839 33.0557 55.8103C32.4801 55.4367 32.0315 54.9057 31.7666 54.2844C31.5017 53.6631 31.4324 52.9795 31.5674 52.32C31.7025 51.6604 32.0358 51.0546 32.5253 50.5791C33.0148 50.1036 33.6384 49.7798 34.3174 49.6486C34.9963 49.5174 35.7 49.5847 36.3396 49.8421C36.9791 50.0994 37.5257 50.5352 37.9103 51.0943C38.2949 51.6535 38.5002 52.3108 38.5002 52.9833C38.5002 53.4298 38.4097 53.8719 38.2338 54.2844C38.0579 54.6969 37.8001 55.0717 37.4751 55.3874C37.1501 55.7032 36.7642 55.9536 36.3396 56.1245C35.9149 56.2953 35.4598 56.3833 35.0002 56.3833Z" fill="#543083"/>
      </svg>
      ` +
      `<p class="question"> Are you sure?</p>` +
      ` <p class="message">${message} </p> `;
    // Use this to apply stopPropagation() method
    return new Promise<boolean>((resolve) => {
      const customDialog = custom({
        title: title,
        messageHtml: messageHtml,
        showTitle: false,
        buttons: [
          {
            text: textNo,
            onClick: (e: any) => {
              e.event.stopPropagation();
              return false;
            },
            elementAttr: { class: 'btn-cancel' },
          },
          {
            text: textYes,
            onClick: (e: any) => {
              e.event.stopPropagation();
              return true;
            },
            elementAttr: { class: 'btn-yes' },
          },
        ],
      });
      customDialog
        .show()
        .then((dialogResult: boolean | PromiseLike<boolean>) => {
          resolve(dialogResult);
        });
    });
  }

  static alert(message: string, title: string): Promise<void> {
    return alert(message, title);
  }
}
