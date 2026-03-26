import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ISignInStyles = {
  page: ViewStyle;
  pageContent: ViewStyle;
  shell: ViewStyle;
  sectionStack: ViewStyle;
  headerPanel: ViewStyle;
  lockBadge: ViewStyle;
  welcome: TextStyle;
  details: TextStyle;
  tabGroup: ViewStyle;
  tabItem: ViewStyle;
  tabItemActive: ViewStyle;
  tabText: TextStyle;
  tabTextActive: TextStyle;
  formPanel: ViewStyle;
  formInputs: ViewStyle;
  fieldBlock: ViewStyle;
  fieldLabel: TextStyle;
  fieldInput: TextStyle;
  forgotLink: TextStyle;
  biometricRow: ViewStyle;
  checkBox: ViewStyle;
  checkBoxChecked: ViewStyle;
  checkBoxTick: TextStyle;
  biometricLabel: TextStyle;
  primaryButton: ViewStyle;
  primaryButtonText: TextStyle;
  secondaryButton: ViewStyle;
  secondaryButtonContent: ViewStyle;
  secondaryButtonText: TextStyle;
  dividerRow: ViewStyle;
  dividerLine: ViewStyle;
  dividerText: TextStyle;
  oauthSection: ViewStyle;
  socialRow: ViewStyle;
  socialButton: ViewStyle;
  socialButtonContent: ViewStyle;
  socialText: TextStyle;
  legalSection: ViewStyle;
  legalText: TextStyle;
  legalLink: TextStyle;
  inputError: TextStyle;
  inputHint: TextStyle;
  authFeedback: TextStyle;
  changeLanguageContent: ViewStyle;
  languageItem: ViewStyle;
  title: TextStyle;
};

export const styles = StyleSheet.create<ISignInStyles>({
  page: {
    width: '100%',
    flex: 1,
  },
  pageContent: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  shell: {
    width: '100%',
    maxWidth: 392,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 24,
    shadowColor: '#CBD5E1',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.14,
    shadowRadius: 30,
    elevation: 8,
  },
  sectionStack: {
    width: '100%',
    gap: 28,
  },
  headerPanel: {
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  lockBadge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E7FCFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
  },
  details: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabGroup: {
    marginHorizontal: 16,
    borderRadius: 14,
    flexDirection: 'row',
    backgroundColor: '#EEF1F6',
    padding: 5,
  },
  tabItem: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  tabItemActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#111827',
    fontWeight: '700',
  },
  formPanel: {
    paddingHorizontal: 16,
    gap: 18,
  },
  formInputs: {
    gap: 16,
  },
  fieldBlock: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  fieldInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    height: 42,
    paddingHorizontal: 14,
    color: '#111827',
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    fontSize: 12,
    color: '#D14343',
  },
  inputHint: {
    fontSize: 12,
    color: '#667085',
  },
  authFeedback: {
    fontSize: 12,
    color: '#D14343',
    textAlign: 'center',
  },
  forgotLink: {
    alignSelf: 'flex-end',
    color: '#08D9E2',
    fontSize: 13,
    fontWeight: '600',
  },
  biometricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  checkBox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxChecked: {
    backgroundColor: '#22D3EE',
    borderColor: '#22D3EE',
  },
  checkBoxTick: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  biometricLabel: {
    color: '#4B5563',
    fontSize: 14,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#20D9DE',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    marginTop: 2,
  },
  primaryButtonText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderColor: '#8CF2F4',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  secondaryButtonText: {
    color: '#08D9E2',
    fontSize: 14,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  oauthSection: {
    width: '100%',
    gap: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#6B7280',
    fontSize: 13,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  socialButton: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: '#D9E2EC',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  socialText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  legalSection: {
    width: '100%',
    paddingHorizontal: 12,
  },
  legalText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 18,
  },
  legalLink: {
    color: '#7D889B',
    textDecorationLine: 'underline',
  },
  changeLanguageContent: {
    flexDirection: 'row',
  },
  languageItem: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
});
