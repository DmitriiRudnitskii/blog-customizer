import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, FormEvent } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	});

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const handleChange = (key: keyof ArticleStateType) => (value: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>

						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleChange('fontFamilyOption')}
							title='Шрифт'
						/>

						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleChange('fontSizeOption')}
							title='Размер шрифта'
						/>

						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleChange('fontColor')}
							title='Цвет шрифта'
						/>

						<Separator />

						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleChange('backgroundColor')}
							title='Цвет фона'
						/>

						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleChange('contentWidth')}
							title='Ширина контента'
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
