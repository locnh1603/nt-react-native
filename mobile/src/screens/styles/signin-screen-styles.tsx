import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ISignInStyles = {
    page: ViewStyle;
    pageContent: ViewStyle;
    shell: ViewStyle;
    sectionStack: ViewStyle;
    headerPanel: ViewStyle;
    lockBadge: ViewStyle;
    lockGlyph: TextStyle;
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
    secondaryButtonText: TextStyle;
    dividerRow: ViewStyle;
    dividerLine: ViewStyle;
    dividerText: TextStyle;
    oauthSection: ViewStyle;
    socialRow: ViewStyle;
    socialButton: ViewStyle;
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
    },
    shell: {
        width: '100%',
        maxWidth: 340,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 14,
        paddingHorizontal: 16,
    },
    sectionStack: {
        width: '100%',
        gap: 32,
    },
    headerPanel: {
        borderRadius: 8,
        alignItems: 'center',
        gap: 10,
        marginTop: 16,
    },
    lockBadge: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: 'rgba(13, 242, 242, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockGlyph: {
        color: '#0DF2F2',
        fontWeight: '800',
        fontSize: 10,
        letterSpacing: 0.6,
    },
    welcome: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1F2937',
    },
    details: {
        fontSize: 12,
        color: '#667085',
    },
    tabGroup: {
        marginHorizontal: 8,
        borderRadius: 9,
        flexDirection: 'row',
        backgroundColor: '#ECEFF4',
        padding: 4,
    },
    tabItem: {
        flex: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
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
        color: '#1F2937',
        fontWeight: '700',
    },
    formPanel: {
        borderRadius: 8,
        paddingHorizontal: 8,
        gap: 16,
    },
    formInputs: {
        gap: 16,
    },
    fieldBlock: {
        gap: 6,
    },
    fieldLabel: {
        fontSize: 13,
        color: '#30384A',
        fontWeight: '600',
    },
    fieldInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#C9D3E3',
        borderRadius: 10,
        height: 44,
        paddingHorizontal: 12,
        color: '#111827',
        fontSize: 15,
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
        color: '#0DF2F2',
        fontSize: 13,
        fontWeight: '600',
    },
    biometricRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#C5CEDD',
        borderRadius: 4,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxChecked: {
        backgroundColor: '#0DF2F2',
        borderColor: '#0DF2F2',
    },
    checkBoxTick: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '800',
    },
    biometricLabel: {
        color: '#4A5568',
        fontSize: 14,
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#0DF2F2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 46,
    },
    primaryButtonText: {
        color: '#06131A',
        fontSize: 14,
        fontWeight: '800',
    },
    secondaryButton: {
        width: '100%',
        height: 46,
        borderWidth: 1,
        borderColor: '#0DF2F2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        color: '#0DF2F2',
        fontSize: 14,
        fontWeight: '700',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    oauthSection: {
        width: '100%',
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#D7DCE5',
    },
    dividerText: {
        marginHorizontal: 8,
        color: '#6B7280',
        fontSize: 13,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialButton: {
        width: '48%',
        height: 42,
        borderWidth: 1,
        borderColor: '#D3DBE8',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialText: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '600',
    },
    legalSection: {
        width: '100%',
        marginBottom: 16,
    },
    legalText: {
        textAlign: 'center',
        color: '#97A0AF',
        fontSize: 12,
        lineHeight: 17,
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