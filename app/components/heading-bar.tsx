
import { styled } from 'nativewind';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

const SView = styled(View);
const SText = styled(Text);
const STouchableOpacity = styled(TouchableOpacity);

interface HeadingBarProps {
	title: string;
	hidden?: boolean;
	onBackPress?: () => void;
	rightContent?: React.ReactNode;
}

const HeadingBar: React.FC<HeadingBarProps> = ({
	title,
	hidden = false,
	onBackPress,
	rightContent,
}) => {
	if (hidden) return null;

	return (
		<SView
			className={`flex-row items-center justify-between bg-white border-b border-b-[#eee] min-h-[60px] px-4 pb-3 ${
				Platform.OS === 'ios' ? 'pt-12' : 'pt-5'
			}`}
		>
			{onBackPress && (
				<STouchableOpacity onPress={onBackPress} className="pr-3 py-1">
					<SText className="text-[22px] text-blue-500">{'<'}</SText>
				</STouchableOpacity>
			)}
			<SText className="flex-1 text-center text-[20px] font-bold text-[#222]">{title}</SText>
			<SView className="min-w-8 items-end">{rightContent}</SView>
		</SView>
	);
};

export default HeadingBar;
